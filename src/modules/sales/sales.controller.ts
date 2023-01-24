import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Sales } from './sales.entity';
import { SalesService } from './sales.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Crud({
  model: {
    type: Sales,
  },
})
@Controller('sales')
@ApiTags('sales')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SalesController implements CrudController<Sales> {
  constructor(public service: SalesService) {}
}
