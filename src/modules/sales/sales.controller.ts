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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Sales } from './sales.entity';
import { SalesService } from './sales.service';

@Crud({
  model: {
    type: Sales,
  },
  query: {
    join: {
      customers: {
        eager: true,
      },
    },
  },
})
@Controller('sales')
@ApiTags('sales')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SalesController implements CrudController<Sales> {
  constructor(public service: SalesService) {}
  get base(): CrudController<Sales> {
    return this;
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const res: any = await this.base.getManyBase(req);
    const newRes = res?.map((item: Sales) => {
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
    const newRes = res?.map((item: Sales) => {
      return {
        ...item,
        items: JSON.parse(item?.items),
      };
    });
    return newRes;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Sales) {
    dto.items = JSON.stringify(dto.items);
    return this.base.createOneBase(req, dto);
  }

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Sales) {
    dto.items = JSON.stringify(dto.items);
    return this.base.updateOneBase(req, dto);
  }
}
