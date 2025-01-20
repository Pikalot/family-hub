import styles from "./Components.module.css";

export default function Navbar() {
    // const session = await getServerSession(authOptions);

    // let profileImage: string | null = null;
    // if (session?.user?.username) {
    //     profileImage = await getUserAccountImage(session.user.id as unknown as number);
    // }

    return (
        <div className={styles["navbar"]}>
            {/* <div> */}
                {/* Top Header Section */}
                {/* <div> */}
                    {/* Logo */}
                    {/* <div> */}
                        Navbar
                        {/* <Link href='/'>
                            <div
                                className="avatar flex items-center justify-center"
                                style={{
                                    width: `${"4em"}`,
                                    aspectRatio: '1 / 1',
                                }}
                            >
                                <Image
                                    src={LogoIcon}
                                    alt="Game Trees Logo"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    className="rounded-full object-cover"
                                    priority
                                />
                            </div>
                        </Link> */}
                    {/* </div> */}

                    {/* Search Bar */}
                    {/* <div className="hidden min-[1200px]:flex flex-1 mx-4 max-w-full">
                        <SearchBar actionUrl={""} />
                    </div> */}

                    {/* <div> */}
                        {/* Desktop Navigation */}
                        {/* <div> */}
                            {/* <NavButton page="Home" route="/" className='self-center hidden min-[430px]:block text-[1em]' />
                            <NavButton page="Games" route="/temp/all-games" className='self-center hidden min-[530px]:block text-[1em]' />
                            {session?.user.role === "customer" && (
                                <NavButton page="Wishlist" route={`/users/${session?.user?.username}/wishlist`} className='flex-shrink-0 hidden min-[830px]:block text-[1em]' />
                            )}
                            {session?.user.role === "admin" && (
                                <>
                                    <NavButton page="Admin User View" route="/admin/user-view" className='flex-shrink-0 hidden min-[780px]:block text-[1em]' />
                                </>
                            )}
                            {session?.user.role === "manager" && (
                                <NavButton page="Inventory" route={`/users/${session?.user?.username}/inventory`} className='flex-shrink-0 hidden min-[830px]:block text-[1em]' />
                            )} */}

                            {/* Conditional Rendering based on session */}
                            {/* {session?.user ? (
                                <>
                                    <Link href={"/account-settings"} className='cursor-pointer'>
                                        <ProfileButton
                                            avatarClassName="ring-offset-2 ring-offset-slate-500 dark:ring-offset-slate-800"
                                            className="hidden min-[330px]:flex h-[80px]"
                                            username={session.user.username}
                                            firstname={session.user.firstname}
                                            lastname={session.user.lastname}
                                            image={profileImage ?? undefined}
                                        />
                                    </Link>
                                    <SignOutButton className='flex-shrink-0 hidden min-[1200px]:block px-3 py-2 text-[1em]' />
                                </>
                            ) : (
                                <>
                                    <LoginButton className='flex-shrink-0 text-[1em]' />
                                    <SignUpButton className='flex-shrink-0 hidden min-[750px]:block text-[1em]' />
                                </>
                            )} */}
                        {/* </div> */}

                        {/* Hamburger Menu Button (Client-Side Dropdown) */}
                        {/* <HamburgerMenu /> */}
                    {/* </div> */}

                {/* </div> */}

                {/* Search Bar (Visible Only on Mobile) */}
                {/* <div className="block min-[1200px]:hidden w-full px-4 pt-1 pb-8 text-[1em]">
                    <SearchBar actionUrl={""} />
                </div> */}
            {/* </div> */}
        </div >
    );
}