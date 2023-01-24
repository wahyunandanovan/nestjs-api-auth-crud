import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  findAll(): string {
    return `
    <!DOCTYPE html>
    <head>
        <title>HTML and CSS "Hello World"</title>
        <style>
            body {
                background-color: #2D2D2D;
                text-align: center;
                padding-top: 100px;
            }
            
            h1 {
                color: #C26356;
                font-size: 30px;
                font-family: Menlo, Monaco, fixed-width;
            }
            
            p {
                color: white;
                font-family: "Source Code Pro", Menlo, Monaco, fixed-width;
            }
        </style>
    </head>
    <body>
        <h1>API inventory-app</h1>
        <p>Author: wahyu nanda novan</p>
        <p>Email: wahyunandanovan@gmail.com</p>
    </body>
    </html>
    `
  }
}

