const AppDescription = () => {

    return (
        <div className="flex min-h-fit flex-col gap-2.5 bg-white p-4 rounded-xl">
            <img src="/assets/logo.png" alt="logo" className="w-25" />
            <dl className="text-text-gray text-xs flex flex-col gap-1 pt-4">
                <div className="flex">
                    <dt>대표자 : </dt>
                    <dd>한현수</dd>
                </div>
                <div className="flex">
                    <dt>주소 : </dt>
                    <dd>서울특별시 영등포구 국회대로62길 21 7층</dd>
                </div>
                <dt className="mt-4 pt-4 border-t border-gray-300">COPYRIGHT © dycis.co.kr ALL RIGHTS RESERVED</dt>
            </dl>
        </div>
    );
};

export default AppDescription;
