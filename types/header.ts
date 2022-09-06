/**
 * 登录数据接口
 */
export interface IHeaderData {
  keyword: string;
  showForm: boolean;
}


interface Iparams{
  keyword?: string | undefined
}
interface Iquery{
  category1Id?: string | undefined,
  categoryName?: string | undefined
}
export interface Ilocation{
  name: string,
  params:Iparams,
  query: Iquery
}