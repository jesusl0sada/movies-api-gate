import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies') // <--- Ruta limpia: localhost:3000/movies
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }
}
