export default function NavBarTitleItem(props) {
    return (
        <>
            {/*div w fill , h 240  , flex row allign center item center from left start*/}
            <div className="w-full h-240 flex flex-row  border-black">
                {/*h1 Late 18px regular*/}
                <h1 className="text-18px font-regular text-black">
                    {props.title}
                </h1>
            </div>
        </>
    );
}
