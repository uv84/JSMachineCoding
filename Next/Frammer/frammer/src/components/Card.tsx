import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { IconCaretRight, IconX } from '@tabler/icons-react'

export default function Card() {
  return (
    <div
     className={cn("w-72 min-h-[26rem] h-[26rem] rounded-xl",
        "shadow-[0_1px_1px_rgba(0,0,0,0.5),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.4)]",
        "p-4 flex flex-col"
     )}>
      <h2 className='font-bold text-[10px]'> Aceternity UI components</h2>
      <p className='text-neutral-900 mt-2 text-[10px]'>
        A collection of beautiful UI components, lets get on with it.
      </p>
      <div className="flex items-center justify-around">
        <button className='flex items-center gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.5),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.4)]'>
          <Image className="h-4 w-4 " width={50} height={50} src="/logo.png" alt="logo"/>{" "}
          Acernity
          <IconX className='h-3 w-3 text-neutral-400'/>
          </button>
      </div>
      <div className='bg-gray-100'></div>
    </div>
  )
}
