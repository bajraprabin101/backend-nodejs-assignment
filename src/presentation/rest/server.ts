import '@tsed/platform-express';
import '@tsed/swagger';
import '@tsed/ajv';
import './filters';

import { PlatformApplication } from '@tsed/common';
import { importProviders } from '@tsed/components-scan';
import { Configuration, Inject } from '@tsed/di';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import endent from 'endent';
import express from 'express';
import figlet from 'figlet';
import helmet from 'helmet';
import methodOverride from 'method-override';

import { Logger } from '@domain/shared';
import { GlobalConfig } from '@infrastructure/shared/config';

import { AppConfig, AppInfo } from './config';
import { ErrorHandlerMiddleware, LoggerMiddleware, MetadataMiddleware, NotFoundMiddleware } from './middlewares';

@Configuration({
  rootDir: __dirname,
  acceptMimes: ['application/json'],
  httpPort: AppConfig.PORT,
  httpsPort: false,
  swagger: [
    {
      path: `${AppConfig.BASE_PATH}/docs`,
      specVersion: '3.0.3',
      spec: {
        info: {
          title: AppInfo.APP_NAME,
          description: AppInfo.APP_DESCRIPTION,
          version: AppInfo.APP_VERSION,
          license: {
            name: 'Logica',
            url: 'https://logicabeans.com.np'
          }
        },
        components: {
          securitySchemes: {
            Bearer: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: endent`A valid *Access Token* is required to access protected resources. To obtain one, simply authenticate to the API through the authentication endpoint. If the authentication is successful, an Access Token and a Refresh Token will be returned.
              \n
              The *Access Token* can be attached to requests using one of the headers \`Authorization: Bearer <access_token>\` and \`access-token: <access-token>\` or a cookie called \`access-token\`.
              \n
              The *Refresh Token* can be sent using the header \`refresh-token: <refresh-token>\` or the cookie \`refresh-token\`.
              \n
              🧐 *The headers override the cookies, so if both are sent, the value of the headers will be used. In the case of the Access Token, the header with the highest priority is the one corresponding to the Authorization Bearer scheme.*
              \n
              **Sample username and password to use on \`/api/auth/login\` endpoint**: \`janedoe\` / \`123456\``
            }
          }
        }
      }
    }
  ],
  logger: {
    level: 'error',
    disableRoutesSummary: true,
    logRequest: false
  }
})
class Server {
  @Inject()
  private app: PlatformApplication;

  public static getProviders(): Promise<Partial<TsED.Configuration>> {
    return importProviders({
      mount: {
        [AppConfig.BASE_PATH]: [`${__dirname}/controllers/**/*.controller.ts`]
      },
      imports: [
        `${__dirname}/../../infrastructure/**/*.domain-service.ts`,
        `${__dirname}/../../infrastructure/**/*.repository.ts`
      ]
    });
  }

  public $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [`'self'`, `'unsafe-inline'`],
              styleSrc: [`'self'`, `'unsafe-inline'`],
              imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
            }
          }
        })
      )
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cookieParser())
      .use(compression({}))
      .use(methodOverride())
      .use(MetadataMiddleware)
      .use(LoggerMiddleware);
  }

  public $afterRoutesInit(): void {
    this.app.use(NotFoundMiddleware).use(ErrorHandlerMiddleware);
  }

  public $onReady(): void {
    if (!GlobalConfig.IS_TEST) {
      this.showBanner();
    }
  }

  private showBanner(): void {
    const banner = endent`Application started successfully!
      ${figlet.textSync(AppInfo.APP_NAME)}
       Name: ${AppInfo.APP_NAME}
       Description: ${AppInfo.APP_DESCRIPTION}
       Version: ${AppInfo.APP_VERSION}
       Port: ${AppConfig.PORT}
       Base Path: ${AppConfig.BASE_PATH}
       OpenApi Spec Path: ${AppConfig.BASE_PATH}/docs
       Environment: ${GlobalConfig.ENVIRONMENT}
    `;
    Logger.info(banner);
  }
}

export { Server };
