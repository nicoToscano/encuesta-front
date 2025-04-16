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

  @Post('login')
  async validarUsuario(@Body() body: { correo: string; contrasena: string }) {
    const { correo, contrasena } = body;
    const usuario = await this.encuestaService.getUsuario(correo);

    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuario.contrasena !== contrasena) {
      return { success: false, mensaje: 'Contraseña incorrecta' };
    }

    return { success: true, mensaje: 'Usuario validado', usuario };
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
