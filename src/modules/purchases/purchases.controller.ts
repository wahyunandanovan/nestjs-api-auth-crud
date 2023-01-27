import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Purchases } from './purchases.entity';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Crud({
  model: {
    type: Purchases,
  },
  query: {
    join: {
      suppliers: {
        eager: true,
      },
    },
  },
})
@Controller('purchases')
@ApiTags('purchases')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PurchasesController implements CrudController<Purchases> {
  constructor(public service: PurchasesService) {}
  get base(): CrudController<Purchases> {
    return this;
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const res: any = await this.base.getManyBase(req);
    const newRes = res?.map((item: Purchases) => {
      return {
        ...item,
        items: JSON.parse(item?.items),
      };
    });
    return newRes;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest) {
    const res: any = await this.base.getOneBase(req);
    const newRes = res?.map((item: Purchases) => {
      return {
        ...item,
        items: JSON.parse(item?.items),
      };
    });
    return newRes;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Purchases) {
    dto.items = JSON.stringify(dto.items);
    return this.base.createOneBase(req, dto);
  }

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Purchases) {
    dto.items = JSON.stringify(dto.items);
    return this.base.updateOneBase(req, dto);
  }
}
