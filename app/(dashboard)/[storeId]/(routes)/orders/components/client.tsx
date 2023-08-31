"use client"

// a client component where we load all of our proudcts


import { useParams, useRouter } from 'next/navigation'

import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'

import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'



interface OrderClientProps {
  data: OrderColumn[]
}


export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>

      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
        />

        <Separator />
        <DataTable columns={columns} searchKey="products" data={data} />

    </>

  )
}
