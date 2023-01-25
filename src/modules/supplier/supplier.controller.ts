import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Suppliers } from './supplier.entity';
import { SuppliersService } from './supplier.service';

@Crud({
  model: {
    type: Suppliers,
  },
})
@Controller('suppliers')
@ApiTags('suppliers')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SuppliersController implements CrudController<Suppliers> {
  constructor(public service: SuppliersService) {}
}
