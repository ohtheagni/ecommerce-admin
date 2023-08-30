"use client"

// a client component where we load all of our billboards

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'

import { SizeColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'



interface SizesClientProps {
  data: SizeColumn[]
}

export const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
        <div className='flex items-center justify-between'>Billboard client
            <Heading
             title={`Sizes (${data.length})`}
             description="Manage sizes for your store"
             />
            <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                <Plus className='mr-2 h-4 w-4' />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable columns={columns} searchKey="label" data={data} />
        <Heading title="API" description="API calls for Sizes" />
        <Separator />
        <ApiList entityName='sizes' entityIdName='sizeId'/>
    </>

  )
}