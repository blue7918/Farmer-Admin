import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getMemberCoupon } from 'src/apis/order/order';
import { postMemberPoint } from 'src/apis/order/order';
import { ICoupon } from 'src/types/order/types';

const useDiscount = (setTotalAmount: Dispatch<SetStateAction<number>>) => {
  const [coupon, setCoupon] = useState<ICoupon[]>();
  const [point, setPoint] = useState<number>();
  const [usedPoint, setUsedPoint] = useState<number>();

  useEffect(() => {
    // 적립금 데이터 불러오기
    postMemberPoint().then(res => {
      setPoint(res);
      setUsedPoint(res);
    });
    // 쿠폰 데이터 불러오기
    getMemberCoupon().then(res => setCoupon(res));
  }, []);

  // 쿠폰이 선택되었을 때
  const [selectedCouponId, setSelectedCouponId] = useState<number>();
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>();
  const [disabledCouponBtn, setDisabledCouponBtn] = useState(false);
  const [disabledPointBtn, setDisabledPointBtn] = useState(false);

  const handleSelectedCoupon = (
    event: React.ChangeEvent<HTMLOptionElement>,
  ) => {
    const selectedValue = Number(event.target.value);
    setSelectedCouponId(selectedValue);
    // 쿠폰을 선택하지 않았을 때
    if (selectedValue === 0) {
      setDisabledPointBtn(false);
    }
  };

  useEffect(() => {
    if (!coupon) return;

    const selectedOption = coupon.find(
      coupon => coupon.couponId === selectedCouponId,
    );
    setSelectedCoupon(selectedOption || null);
    setDisabledPointBtn(selectedOption ? true : false);
    setDisabledCouponBtn(selectedOption ? false : true);
  }, [selectedCouponId, coupon]);

  // 적립금을 적용할 때
  const handlePointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedPoint = Number(event.target.value);
    setUsedPoint(typedPoint);
    if (typedPoint > point) {
      alert('최대로 사용할 수 있는 적립금을 초과하였습니다.');
    }
    if (selectedCouponId === 0) {
      setDisabledPointBtn(false);
    }
  };

  // 최종 할인된 가격 계산
  const [discountedPrice, setDiscountedPrice] = useState<number>();

  const getDiscountedPrice = (fullPrice: number) => {
    if (selectedCoupon !== null) {
      setDisabledCouponBtn(false);
    }
    if (selectedCoupon === null && usedPoint) {
      setDiscountedPrice(usedPoint);
      setDisabledCouponBtn(true);
    }
    if (selectedCoupon && selectedCoupon.couponPolicy === 'FIXED') {
      setDiscountedPrice(selectedCoupon.fixedPrice);
    }
    if (selectedCoupon && selectedCoupon.couponPolicy === 'RATE') {
      const price = fullPrice * (selectedCoupon.rateAmount / 100);
      setDiscountedPrice(price);
    }
  };

  //최종 가격 계산
  const getFinalPrice = (productPrice: number) => {
    const finalPrice = isNaN(productPrice - discountedPrice)
      ? productPrice
      : productPrice - discountedPrice;
    setTotalAmount(finalPrice);
    return finalPrice;
  };
  return {
    coupon,
    usedPoint,
    handlePointChange,
    handleSelectedCoupon,
    disabledPointBtn,
    disabledCouponBtn,
    getDiscountedPrice,
    discountedPrice,
    getFinalPrice,
  };
};

export default useDiscount;
