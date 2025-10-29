import MedamLogoBox from "@/svg/MedamLogoBox";
import { useServiceModalStore } from "@/store/useServiceModalStore";

const AppDescription = () => {
    const { open } = useServiceModalStore();

    const openTerms = () => {
        open();
    }

    return (
        <div className="flex min-h-fit flex-col gap-2.5 bg-white p-4">
            <MedamLogoBox />
            <h1 className="text-xs font-[500]">미담</h1>
            <div className="text-text-gray text-xs">
                <p>대양CIS대표자 : 최동성</p>
                <p>사업자등록번호 : 214-87-26600</p>
            </div>
            <div className="text-text-gray text-xs">
                <p>서울본사</p>
                <p>
                    경기도 성남시 중원구 둔총대로 388번길 24 <br/>
                    우림라이온스밸리 3차 512호
                </p>
                <p>TEL : 02-573-2248</p>
                <p>FAX : 02-573-5236</p>
            </div>
            <div className="text-text-gray text-xs">
                <p>서울본사 / 남부지사(부산) / 동부지사(원주)</p>
                <p>중부지사(대구) / 서부지사(광주)</p>
            </div>
            {/*<div className="text-text-gray text-xs">*/}
            {/*    <p>남부지사(부산)</p>*/}
            {/*    <p>부산광역시 수영구 장대골로 7번길 51 월드파크 2동 602호</p>*/}
            {/*</div>*/}
            {/*<div className="text-text-gray text-xs">*/}
            {/*    <p>동부지사(원주)</p>*/}
            {/*    <p>강원도 원주시 무실로 415</p>*/}
            {/*</div>*/}
            {/*<div className="text-text-gray text-xs">*/}
            {/*    <p>중부지사(대구)</p>*/}
            {/*    <p>대구광역시 달서구 신당로 55, 207동 1509호</p>*/}
            {/*</div>*/}
            {/*<div className="text-text-gray text-xs">*/}
            {/*    <p>서부지사(광주)</p>*/}
            {/*    <p>광주광역시 동구 양림로 119번길 7, 영동오피스텔 801호</p>*/}
            {/*</div>*/}
            <div className="text-text-gray text-xs">
                <p>COPYRIGHT © dycis.co.kr ALL RIGHTS RESERVED</p>
                <p><a className="underline cursor-pointer" onClick={openTerms}>개인정보 수집 이용</a></p>
                {/*<p><a className="underline cursor-pointer" onClick={openTerms}>서비스 이용약관</a></p>*/}
            </div>
        </div>
    );
};

export default AppDescription;
