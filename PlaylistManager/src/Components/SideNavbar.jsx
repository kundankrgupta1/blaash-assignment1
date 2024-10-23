import { useState } from "react"
import { BsChevronDown, BsSend } from "react-icons/bs"
import { HiViewGrid } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { TbTopologyStarRing3 } from "react-icons/tb";

const SideNavbar = () => {
	const [open, setOpen] = useState(true);
	const [clickedIndex, setClickedIndex] = useState(null);
	const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);

	const listItem = [
		{ icon: <HiViewGrid />, title: "Revenue" },
		{
			icon: <IoImageOutline />, title: "Shopable Video",
			submenu: true,
			submenuItem: [
				{ title: "some text" },
			]
		},
		{
			icon: <IoImageOutline />, title: "Story",
			submenu: true,
			submenuItem: [
				{ title: "some text" },
			]
		},
		{
			icon: <IoImageOutline />, title: 'Live Commerce',
			submenu: true,
			submenuItem: [
				{ title: "some text" },
			]
		},
		{
			icon: <IoImageOutline />, title: "Playlist Manager",
			submenu: true,
			submenuItem: [
				{ title: "Product playlist" },
			]
		},
		{ icon: <BsSend />, title: "One Click Post" },
		{ icon: <SlCalender />, title: "Calender" },
		{ icon: <TbTopologyStarRing3 />, title: "Hire Influencer" },
	]

	const handleSubmenuToggle = (index) => {
		setSubmenuOpenIndex(submenuOpenIndex === index ? null : index);
	};

	const handleItemClick = (index) => {
		setClickedIndex(clickedIndex === index ? null : index);
	};

	return (
		<div
			className={`relative bg-[#27272F] ${open ? "w-72" : "w-20"} pt-8 rounded-lg duration-300 h-[97vh]`}
		>
			<IoIosArrowBack
				className={`p-1 text-3xl text-slate-400 rounded-full bg-[#27272F] absolute -right-3 top-10 cursor-pointer ${!open && "rotate-180"}`}
				onClick={() => setOpen(!open)}
			/>
			<img
				src={open ? "https://raw.githubusercontent.com/kundankrgupta1/media/refs/heads/main/assets/blaash.png" : "https://raw.githubusercontent.com/kundankrgupta1/media/refs/heads/main/assets/blaash_small.png"}
				alt=""
				className={` ${!open ? "pt-2 m-auto" : "pl-4 w-32"} cursor-pointer duration-300}`}
			/>

			<ul className="mt-8">
				{listItem.map((e, index) => {
					return (
						<li key={index}
							className={`ml-2 ${clickedIndex === index ? "border-[1px] border-solid border-white" : ""} rounded-tl-lg rounded-bl-lg border-r-0 py-2 pl-2`}
						>
							<div
								className="hover:rounded-tl-lg rounded-bl-lg text-white cursor-pointer p-2 hover:bg-gray-500 flex items-center gap-4"
								onClick={() => handleItemClick(index)}
							>
								<div
									className="w-full flex items-center gap-4 duration-300"
									onClick={() => handleSubmenuToggle(index)}
								>
									<span className={`text-2xl`}>{e.icon}</span>
									<div className="w-full flex justify-between items-center">
										{open && <span className="text-sm">{e.title}</span>}
										{e.submenu && open && (<BsChevronDown />)}
									</div>
								</div>
							</div>
							{e.submenu && submenuOpenIndex === index && (
								<ul className="">
									{e.submenuItem.map((subItem, subIndex) => {
										return (
											<li key={subIndex}
												className="mt-1 rounded-tl-lg rounded-bl-lg text-white cursor-pointer p-2 bg-gray-500 flex items-center gap-4 duration-300"
											>
												{subItem.title}
											</li>
										)
									})}
								</ul>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default SideNavbar;
