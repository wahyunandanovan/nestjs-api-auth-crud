import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Purchases } from './purchases.entity';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Crud({
  model: {
    type: Purchases,
  },
})
@Controller('purchases')
@ApiTags('purchases')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PurchasesController implements CrudController<Purchases> {
  constructor(public service: PurchasesService) {}
}
