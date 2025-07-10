import { User, ChevronUp, ChevronDown, List, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useProfileStore } from "@/store/profile";
import type { Profile } from "@/types/profile";
import { NavLink, useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { routeName } from "@/constants/routeName";
import classNames from "classnames";
import * as authApi from "@/apis/auth/api";

const managementRouteName = routeName.dashboard.children.management;
const homeRouteName = routeName.dashboard.children.home;

// TODO: Refactor navbar
const brands = [
  {
    title: "Danh sách",
    url: `${managementRouteName.ROOT}/${managementRouteName.children.brand.ROOT}`,
    icon: List,
  },
];

const home = [
  {
    title: "Trang chủ",
    url: homeRouteName.ROOT,
    icon: Home,
  },
];

const navLinkClassnames = (isActive: boolean, isChild: boolean = false) =>
  classNames({
    "text-foreground": isActive,
    "pl-4": isChild,
  });

export function AppSidebar() {
  const profile = useProfileStore.use.data() as Profile;
  const logout = useProfileStore.use.logout();
  const location = useLocation();

  const isBrandActive =
    location.pathname.split("/")[2] === managementRouteName.children.brand.ROOT;

  const handleSignOut = async () => {
    await authApi.logout();
    logout();
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem key={home[0].title}>
                <SidebarMenuButton
                  asChild
                  className="hover:text-foreground text-gray-500"
                >
                  <NavLink to={home[0].url}>
                    {({ isActive }) => (
                      <span className={navLinkClassnames(isActive)}>
                        {home[0].title}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quản lí</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                defaultOpen={false}
                className="group group/collapsible text-sidebar-foreground/70"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={classNames("data-[state=open]:text-foreground", {
                      "text-foreground": isBrandActive,
                    })}
                  >
                    <div className="text-sm">Thương hiệu</div>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    {brands.map((brand) => (
                      <SidebarMenuItem key={brand.title}>
                        <SidebarMenuButton
                          asChild
                          className="hover:group-data-[state=open]:text-foreground hover:bg-transparent"
                        >
                          <NavLink to={brand.url}>
                            {({ isActive }) => (
                              <span
                                className={navLinkClassnames(isActive, true)}
                              >
                                {brand.title}
                              </span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User /> {`${profile.firstName} ${profile.lastName}`}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="w-full">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
