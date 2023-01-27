import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Customers } from './customers.entity';
import { CustomersService } from './customers.service';

@Crud({
  model: {
    type: Customers,
  },
})
@Controller('customers')
@ApiTags('customers')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CustomersController implements CrudController<Customers> {
  constructor(public service: CustomersService) {}
}
