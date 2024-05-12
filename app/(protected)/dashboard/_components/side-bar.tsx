'use client'
import { Button } from '@/components/ui/button'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'

import { Option, options } from '@/constant/sidebar'
import { cn } from '@/lib/utils'
import { Store, User } from '@prisma/client'
import { ChevronDown, ChevronUp, Lock, LucideIcon, UnlockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props {
  store: Store
  user: User
}

const SideBar: React.FC<Props> = ({ user, store }) => {
  return (
    <div className={cn('group h-screen bg-background flex-shrink-0 hidden flex-col gap-y-2  p-2 border-r relative md:flex w-[200px]')}>
      <div className='w-full  flex items-center justify-center'>
        <Image src={store.storeLogo || '/images/placeholder.webp'} alt='Sidebar Logo' width={60} height={60} className='rounded-md object-contain' />
      </div>
      <Command className='bg-background'>
        <CommandList>
          {options.map((section, i) => {
            return (
              <CommandGroup key={i}>
                <h4 className={cn('font-bold text-sm p-2 bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative text-start')}>{section.heading.charAt(0).toUpperCase() + section.heading.slice(1)}</h4>
                {section.options.map((s, i) => {
                  return (
                    <div key={i}>
                      {s.isCollapsible ? (
                        <CollapsibleList shouldShown={true} name={s.name} icon={s.icon} dropDownOtions={s.dropDownOptions || []} store={store} />
                      ) : (
                        <CommandItem>
                          <Link href={`/dashboard/${s.link}`} className={cn('flex gap-x-2  w-full items-end transition-all hover:translate-x-1 justify-start')}>
                            <s.icon size={24} />
                            <span>{s.name}</span>
                          </Link>
                        </CommandItem>
                      )}
                    </div>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </Command>
    </div>
  )
}

export default SideBar

interface CollapsibleListProps {
  name: string
  icon: LucideIcon
  dropDownOtions: Option[]
  store: Store
  shouldShown: boolean
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({ name, icon: Icon, dropDownOtions, store, shouldShown }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [shouldShown])

  return (
    <CommandItem className='p-0'>
      <Collapsible className='w-full  ' open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className={cn(' flex gap-x-2  w-full justify-center p-2', shouldShown && 'justify-between')}>
          <div className='flex gap-x-2 items-end'>
            <Icon size={24} />
            <span className={cn('hidden', shouldShown && 'block')}>{name}</span>
          </div>
          <div className={cn('hidden', shouldShown && 'block')}>{open ? <ChevronUp /> : <ChevronDown />}</div>
        </CollapsibleTrigger>

        <CollapsibleContent className='px-2'>
          {dropDownOtions.map((option, i) => {
            return (
              <div key={i} className=' p-2 '>
                <Link href={`/dashboard/${option.link}`} className={cn('flex gap-x-2  w-full items-end justify-center transition-all hover:translate-x-1  ', shouldShown && 'justify-start')}>
                  <option.icon size={24} />
                  <span className={cn(' hidden', shouldShown && 'block')}>{option.name}</span>
                </Link>
              </div>
            )
          })}
        </CollapsibleContent>
      </Collapsible>
    </CommandItem>
  )
}