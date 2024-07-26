'use client'

import { type FC } from 'react'

import { NavbarContent, NavbarItem } from '@/components/next-ui/navbar/navbar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
} from '@/components/next-ui/dropdown/dropdown'
import { Avatar } from '@/components/next-ui/avatar/avatar'

interface IProps {
}

const ContentRightSide: FC<Readonly<IProps>> = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="pr-1.5 ring-0">
        <Dropdown placement="bottom-end" classNames={{
          content: 'bg-content4',
        }}>
          <DropdownTrigger className="DropdownTrigger">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="bordered" className="my-class" classNames={{
            base: 'bg-content4',
            emptyContent: 'border-content4',
          }}>
            <DropdownSection showDivider classNames={{
              divider: 'bg-background'
            }}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
            </DropdownSection>
            <DropdownItem key="logout" className={'text-danger'} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NavbarContent>
    // <NavbarContent justify='end'>
    //   <NavbarItem>
    //     <Link
    //       href='https://github.com/acayseth/iivineri'
    //       rel='nofollow'
    //       target='_blank'
    //     >
    //       <FaGithub className='rounded-full w-8 h-8 text-black bg-white' />
    //     </Link>
    //   </NavbarItem>
    // </NavbarContent>
  )
}

export { ContentRightSide }
