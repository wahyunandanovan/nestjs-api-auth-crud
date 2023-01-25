import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Crud({
  model: {
    type: Category,
  },
})
@Controller('category')
@ApiTags('category')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}
