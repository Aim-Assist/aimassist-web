import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PetsIcon from '@mui/icons-material/Pets';
import { Calendar as CalendarIcon } from "../../icons/calendar";
import { Cash as CashIcon } from "../../icons/cash";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { ChartPie as ChartPieIcon } from "../../icons/chart-pie";
import { ChatAlt2 as ChatAlt2Icon } from "../../icons/chat-alt2";
import { ClipboardList as ClipboardListIcon } from "../../icons/clipboard-list";
import { CreditCard as CreditCardIcon } from "../../icons/credit-card";
import { Home as HomeIcon } from "../../icons/home";
import { LockClosed as LockClosedIcon } from "../../icons/lock-closed";
import { Mail as MailIcon } from "../../icons/mail";
import { MailOpen as MailOpenIcon } from "../../icons/mail-open";
import { Newspaper as NewspaperIcon } from "../../icons/newspaper";
import { OfficeBuilding as OfficeBuildingIcon } from "../../icons/office-building";
import { ReceiptTax as ReceiptTaxIcon } from "../../icons/receipt-tax";
import { Selector as SelectorIcon } from "../../icons/selector";
import { Share as ShareIcon } from "../../icons/share";
import { ShoppingBag as ShoppingBagIcon } from "../../icons/shopping-bag";
import { ShoppingCart as ShoppingCartIcon } from "../../icons/shopping-cart";
import { Truck as TruckIcon } from "../../icons/truck";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Users as UsersIcon } from "../../icons/users";
import { XCircle as XCircleIcon } from "../../icons/x-circle";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
const getAdminSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Overview"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      // {
      //   title: t("Analytics"),
      //   path: "/dashboard/analytics",
      //   icon: <ChartBarIcon fontSize="small" />,
      // },
      // {
      //   title: t('Finance'),
      //   path: '/dashboard/finance',
      //   icon: <ChartPieIcon fontSize="small" />
      // },
      {
        title: t("Account"),
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Customer Management"),
    items: [
      {
        title: t("Customers"),
        path: "/dashboard/customers",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: t("Storefront"),
        path: "/dashboard/products2",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Services Offered"),
        path: "/dashboard/products",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Reports"),
        path: "/dashboard/report",
        icon: <ChartBarIcon fontSize="small" />,
      },
      {
        title: t("Orders"),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: "/dashboard/orders",
      },
      {
        title: t("Invoices"),
        path: "/dashboard/invoices",
        icon: <ReceiptTaxIcon fontSize="small" />,
      },
      {
        title: t("Events"),
        path: "/dashboard/event",
        icon: <ArticleIcon fontSize="small" />,
      },
      {
        title: t("Assessment"),
        path: "/dashboard/assessment",
        icon: <AssignmentTurnedInIcon fontSize="small" />,
      },
      {
        title: t("Vaccination Management"),
        path: "/dashboard/vaccinationmanagement",
        icon: <VaccinesIcon fontSize="small" />,
      },
      {
        title: t("Calendar"),
        path: "/dashboard/calendar",
        icon: <CalendarIcon fontSize="small" />,
      },
      {
        title: t("Chat"),
        path: "/dashboard/chat",
        icon: <ChatAlt2Icon fontSize="small" />,
      },
    ],
  },
  // {
  //   title: t('Platforms'),
  //   items: [
  //     {
  //       title: t('Job Listings'),
  //       path: '/dashboard/jobs',
  //       icon: <OfficeBuildingIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Browse'),
  //           path: '/dashboard/jobs'
  //         },
  //         {
  //           title: t('Details'),
  //           path: '/dashboard/jobs/companies/1'
  //         },
  //         {
  //           title: t('Create'),
  //           path: '/dashboard/jobs/new'
  //         }
  //       ]
  //     },
  //     {
  //       title: t('Social Media'),
  //       path: '/dashboard/social',
  //       icon: <ShareIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Profile'),
  //           path: '/dashboard/social/profile'
  //         },
  //         {
  //           title: t('Feed'),
  //           path: '/dashboard/social/feed'
  //         }
  //       ]
  //     },
  //     {
  //       title: t('Blog'),
  //       path: '/blog',
  //       icon: <NewspaperIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Post List'),
  //           path: '/blog'
  //         },
  //         {
  //           title: t('Post Details'),
  //           path: '/blog/1'
  //         },
  //         {
  //           title: t('Post Create'),
  //           path: '/blog/new'
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    title: t("Employee Management"),
    items: [
      {
        title: t("Employees"),
        path: "/dashboard/employees",
        icon: <SupervisorAccountIcon fontSize="small" />,
      },
      {
        title: t("Assign Task"),
        path: "/dashboard/adminassigntask",
        icon: <SupervisorAccountIcon fontSize="small" />,
      },
      {
        title: t("Calendar"),
        path: "/dashboard/calendar",
        icon: <CalendarIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Pages"),
    items: [
      {
        title: t("Auth"),
        path: "/authentication",
        icon: <LockClosedIcon fontSize="small" />,
        children: [
          {
            title: t("Register"),
            path: "/authentication/register?disableGuard=true",
          },
          {
            title: t("Login"),
            path: "/authentication/login?disableGuard=true",
          },
        ],
      },
      {
        title: t("Pricing"),
        path: "/dashboard/pricing",
        icon: <CreditCardIcon fontSize="small" />,
      },
      {
        title: t("Checkout"),
        path: "/checkout",
        icon: <CashIcon fontSize="small" />,
      },
      {
        title: t("Error"),
        path: "/error",
        icon: <XCircleIcon fontSize="small" />,
        children: [
          {
            title: "401",
            path: "/401",
          },
          {
            title: "404",
            path: "/404",
          },
          {
            title: "500",
            path: "/500",
          },
        ],
      },
    ],
  },
];

const getEmployeeSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Account"),
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
      {
        title: t("Session"),
        path: "/dashboard/startsession",
        icon: <PlayCircleFilledIcon fontSize="small" />,
      },
      // {
      //   title: t("Check Out"),
      //   path: "/dashboard/checkout",
      //   icon: <AccessTimeIcon fontSize="small" />,
      // },
    ],
  },
];

const getCustomerSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Dashboard"),
        path: "/dashboard/customers/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Customer Timeline"),
        path: "/dashboard/social/profile",
        icon: <MailOpenIcon fontSize="small" />,
      },
      {
        title: t("Shop"),
        path: "/dashboard/customerItems",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Calendar"),
        path: "/dashboard/calendar",
        icon: <CalendarIcon fontSize="small" />,
      },
      {
        title: t("Pets"),
        path: "/dashboard/pets",
        icon: <PetsIcon fontSize="small" />,
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const adminSections = useMemo(() => getAdminSections(t), [t]);
  const employeeSections = useMemo(() => getEmployeeSections(t), [t]);
  const customerSections = useMemo(() => getCustomerSections(t), [t]);
  // const sections = useMemo(() => {
  //   if(localStorage.getItem("role")=="admin"){
  //     getAdminSections(t)
  //   } else if(localStorage.getItem("role")=="employee"){
  //     getAdminSections(t)
  //   }
  // },[t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          backgroundColor: "#425F57",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {(localStorage.getItem("role") == "admin") && (
              adminSections.map((section) => (
                <DashboardSidebarSection
                  key={section.title}
                  path={router.asPath}
                  sx={{
                    mt: 2,
                    "& + &": {
                      mt: 2,
                    },
                  }}
                  {...section}
                />
              ))
            )}
            {(localStorage.getItem("role") == "employee") && (
              employeeSections.map((section) => (
                <DashboardSidebarSection
                  key={section.title}
                  path={router.asPath}
                  sx={{
                    mt: 2,
                    "& + &": {
                      mt: 2,
                    },
                  }}
                  {...section}
                />
              ))
            )}
            {(localStorage.getItem("role") == "customer") && (
              customerSections.map((section) => (
                <DashboardSidebarSection
                  key={section.title}
                  path={router.asPath}
                  sx={{
                    mt: 2,
                    "& + &": {
                      mt: 2,
                    },
                  }}
                  {...section}
                />
              ))
            )}
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
