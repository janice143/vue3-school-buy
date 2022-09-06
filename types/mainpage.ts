export interface Iconditions {
  //产品相应的级次
  category1Id: string | undefined;
  //产品的名字
  categoryName: string  | undefined;
  //搜索的关键字 keyword
  keyword: string  | undefined;
  //排序:初始状态应该是综合且降序
  order: string;
  //第几页
  pageNo: number;
  //每一页展示条数
  pageSize: number;
}
export class Conditions {
  conditions: Iconditions = {
    //产品相应的级次
    category1Id: "",
    //产品的名字
    categoryName: "",
    //搜索的关键字 keyword
    keyword: "",
    //排序:初始状态应该是综合且降序
    order: "1:desc",
    //第几页
    pageNo: 1,
    //每一页展示条数
    pageSize: 10,
  }
}

