import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { EncuestaService } from './encuesta.service'; 
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';



@Controller('encuestas')
export class EncuestaController {
  supabase: any;
  constructor(private readonly encuestaService: EncuestaService) {}


  @Post('usuarios')
  async crearUsuario(@Body() usuario: CreateUsuarioDto) {
    return this.encuestaService.crearUsuario(usuario);
  }

  @Get('preguntas')
  async obtenerPreguntas() {
    return this.encuestaService.getPreguntas();
  }

  @Get('respuestas/:id')
  async obtenerRespuestas(@Param('id') id: string) {
    return this.encuestaService.getRespuestas(id);
  }

  @Post('respuestas')
  async crearRespuestas(@Body() respuestas: CreateRespuestaDto[]) {
    return this.encuestaService.saveRespuestas(respuestas);
  }

}
