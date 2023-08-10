import request from '../base';

//상품 전체 리스트
export const getProductList = async (orderType: string, id: number) => {
  if(id == undefined) id = 1;
  const response = await request({
    url: `/main/product/${id}?page=0&size=16`,
    params: {
      orderCondition: orderType,
    },
  });
  return response.data;
};

//MD PICK 리스트
export const getMDPickList = async () => {
  const response = await request({url: '/main/product/md-pick?division=MD_PICK'});
  return response.data;
};

///main/product/shop-by-size/product-list?productSize=S&page=0&size=16&sort=string&orderCondition=NEWS
//SHOP BY SIZE 상품
interface Props {
  sizeOption: string;
  orderType: string;
  currentIndex: number;
}
export const getShopBySize = async (props: Props) => {
  const {sizeOption, orderType, currentIndex} = props;
  const response = await request({url: `main/product/shop-by-size/product-list?productSize=${sizeOption}&page=${currentIndex}&size=16&sort=string&orderCondition=${orderType}`});
  // const response = await request({
  //   url: `/main/shop-by-size/product-list`,
  //   params: {
  //     productSize: 'S',
  //     pageable: {
  //       page: 0,
  //       size: 16,
  //     },
  //     orderCondition: 'NEWS'
  //   },
  // });
  return response.data;
};

//상품 세부 페이지
// http://3.39.150.186:8080/api/main/product/detail/20
export const getDetail = async (productId: number) => {
  const response = await request({url: `/main/product/detail/${productId}`});
  return response.data;
};

//기획전 상품 리스트
///main/product/plan-products?division=PLAN
export const getEventProduct = async () => {
  const response = await request({url: '/main/product/plan-products?division=PLAN'});
  return response.data;
};
