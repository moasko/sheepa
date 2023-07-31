import Card from "@/components/Card"

export default function Home() {
  return (
    <div className='w-full grid gap-4'>
      
      <div className='grid gap-4 grid-cols-5 mt-6'>
        <Card headerContent={
          <span className='font-semibold'>Nouvelle Commandes</span>
        }>
          <div>
            <span className='text-[24px] mb-5'>0</span>
            <div className='px-2 py-1 w-max my-3 text-sm font-semibold bg-orange-400/20 text-orange-400 rounded-md'>-0.00%</div>
          </div>
        </Card>

        <Card headerContent={
          <span className='font-semibold'>Total Commandes</span>
        }>
          <div>
            <span className='text-[24px] mb-5'>0</span>
            <div className='px-2 py-1 w-max my-3 text-sm font-semibold bg-orange-400/20 text-orange-400 rounded-md'>-0.00%</div>
          </div>
        </Card>

        <Card headerContent={
          <span className='font-semibold'>Total Clients</span>
        }>
          <div>
            <span className='text-[24px] mb-5'>0</span>
            <div className='px-2 py-1 w-max my-3 text-sm font-semibold bg-orange-400/20 text-orange-400 rounded-md'>-0.00%</div>
          </div>
        </Card>

        <Card headerContent={
          <span className='font-semibold'>Total Produits</span>
        }>
          <div>
            <span className='text-[24px] mb-5'>0</span>
            {/* <div className='px-2 py-1 w-max my-3 text-sm font-semibold bg-orange-400/20 text-orange-400 rounded-md'>-0.00%</div> */}
          </div>
        </Card>

        <Card headerContent={
          <span className='font-semibold'>Revenu total</span>
        }>
          <div>
            <span className='text-[24px] mb-5'>0.00 FCFA</span>
            <div className='px-2 py-1 w-max my-3 text-sm font-semibold bg-orange-400/20 text-orange-400 rounded-md'>-0.00%</div>
          </div>
        </Card>
      </div>

      <div className='flex gap-4'>
        <div className='w-8/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>
        <div className='w-4/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='w-4/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>
        <div className='w-8/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='w-8/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>
        <div className='w-4/12'>
          <Card>
            <span>hjkl</span>
          </Card>
        </div>

      </div>
    </div>

  )
}
