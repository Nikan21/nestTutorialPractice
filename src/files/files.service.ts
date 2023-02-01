import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uudi from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> { 
        try {
            const fileName = uudi.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException('Happen error creating file', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

}
