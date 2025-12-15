import { ImUsers } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineViewList } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaGoogleScholar, FaUserPlus } from "react-icons/fa6";
import { FaFileInvoice, FaMoneyCheckAlt, FaClipboardList } from "react-icons/fa";

export const getNavList = (t) => [
  {
    id: 1,
    title: t("sidebar.dashboard"),
    icon: <RxDashboard className="text-xl" />,
    link: "/",
    clickable: true,
  },
  {
    id: 2,
    title: t("sidebar.students"),
    icon: <ImUsers className="text-xl" />,
    link: "/students",
    clickable: false,
    submenu: [
      { id: 2.1, title: t("sidebar.students_list"), link: "/students/list", icon: <FaMoneyCheckAlt className="text-sm" /> },
      { id: 2.2, title: t("sidebar.new_admission"), link: "/admission", icon: <FaUserPlus className="text-sm" /> },
      { id: 2.3, title: t("sidebar.new_admission_list"), link: "/admission-list", icon: <FaUserPlus className="text-sm" /> },
    ],
  },
  {
    id: 3,
    title: t("sidebar.accounts"),
    icon: <RiMoneyDollarCircleLine className="text-xl" />,
    link: "/account",
    clickable: false,
    submenu: [
      { id: 3.1, title: t("sidebar.fee_payment"), link: "/accounts/fee-payment", icon: <FaMoneyCheckAlt className="text-sm" /> },
      // { id: 3.2, title: t("sidebar.fee_invoice"), link: "/accounts/fee-invoice", icon: <FaFileInvoice className="text-sm" /> },
      { id: 3.2, title: t("sidebar.fee_type"), link: "/accounts/fee-type", icon: <FaClipboardList className="text-sm" /> },
    ],
  },

  {
    id: 4,
    title: t("sidebar.scholarship"),
    icon: <FaGoogleScholar className="text-xl" />,
    link: "/scholarship",
    clickable: false,
    submenu: [
      { id: 4.1, title: t("sidebar.scholarship_list"), link: "/vcsg-scholarship", icon: <MdOutlineViewList size={20} /> },
      { id: 4.2, title: t("sidebar.scholarship_type"), link: "/vcsg-scholarship/type", icon: <BiCategoryAlt size={20} /> },
    ],
  },
];
