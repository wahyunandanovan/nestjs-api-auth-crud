import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Purchases } from './purchases.entity';
import { PurchasesService } from './purchases.service';

@Crud({
  model: {
    type: Purchases,
  },
})
@Controller('purchases')
@ApiTags('purchases')
export class PurchasesController implements CrudController<Purchases> {
  constructor(public service: PurchasesService) {}
}
