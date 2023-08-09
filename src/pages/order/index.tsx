import { useState } from 'react';
import Styled from '../../components/Order/styles';
import Layout from '@pages/layout';
import NestedLayout from '@components/Order/NestedLayout';
import Delivery from '@components/Order/Delivery';
import InputGroup from '@components/Order/InputGroup';
import ProductList from '@components/Order/List/ProductList';
import Agreement from '@components/Order/Agreement';
import { IOrderedProduct } from 'src/types/order/types';
import type { NextPageWithLayout } from '@pages/_app';
import { ReactElement } from 'react';
import Payment from '@components/Order/Payment';
import { useForm } from 'react-hook-form';
const productList: IOrderedProduct[] = [
  { id: '1', title: '상품명', count: 1, price: 12900 },
];

const OrderPage: NextPageWithLayout = () => {
  const [deliveryInfo, setDeliveryInfo] = useState();
  const [payNowDisabled, setPayNowDisabled] = useState(true);
  // const { handleSubmit } = useOrderForm();
  // console.log(handleSubmit);
  //

  const { handleSubmit, setValue, trigger, control } = useForm();
  const onSubmit = data => {
    console.log('제출되었습니다');
    console.log(data);
  };

  // 약관동의
  const handleAgreementChange = (isAllChecked, paymentChecked) => {
    if (isAllChecked && paymentChecked) {
      setPayNowDisabled(false);
    } else {
      setPayNowDisabled(true);
    }
  };

  // 주문자 주소 정보
  const handleDeliveryInfo = (address, shippingMsg) => {
    setDeliveryInfo(address);
  };

  const handleClick = () => {
    console.log('click');
  };

  const clickPay = () => {
    if (payNowDisabled) {
      alert('주문 내용 확인 및 결제에 동의하셔야 구매가 가능합니다.');
      return;
    }

    const { IMP } = window;
    console.log(IMP);
    IMP.init(process.env.NEXT_PUBLIC_IMP_UID);

    const data = {
      pg: 'html5_inicis',
      // pg: 'kakaopay',
      pay_method: 'trans',
      merchant_uid: 'ORD20180131-0000014',
      name: '노르웨이 회전 의자',
      amount: 100,
      buyer_email: 'gildong@gmail.com',
      buyer_name: '홍길동',
      buyer_tel: '010-4242-4242',
      buyer_addr: '서울특별시 강남구 신사동',
      buyer_postcode: '01181',
    };

    const callback = (response: any) => {
      console.log(response);
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        alert('결제 성공');
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    };

    IMP.request_pay(data, callback);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Styled.Wrapper>
        {/* 배송지 */}
        <Delivery control={control} setValue={setValue} trigger={trigger} />
        {/* 주문상품 */}
        <InputGroup title="주문상품">
          <Styled.InnerPaddingWrapper field="product">
            <ProductList productList={productList} />
          </Styled.InnerPaddingWrapper>
        </InputGroup>
        {/* 적립금/쿠폰, 결제금액 */}
        <Payment />
        {/* 약관동의 */}
        <Agreement handleAgreementChange={handleAgreementChange} />
      </Styled.Wrapper>
      <Styled.PayWrapper>
        <Styled.PayNow type="submit">결제하기</Styled.PayNow>
      </Styled.PayWrapper>
    </form>
  );
};

export default OrderPage;

OrderPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
