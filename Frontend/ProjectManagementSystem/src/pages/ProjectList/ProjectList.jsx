import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '../../components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Label } from '../../components/ui/label'

function ProjectList() {
    const handleFilterChange = (section, value) => {
        console.log("value", value, section)
    }
  return (
    <>
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
        <section className='filter scetion'>
            <Card className='p-5 sticky top-10'>

                <div className='flex justify-between lg:w-[20rem]'> 
                    <p className='text-xl -tracking-wider'>Filters</p>
                    <Button variant="ghost" size="icon">

                        <MixerHorizontalIcon />

                    </Button>
                </div>

                <CardContent className="mt -5">
                    <ScrollArea className="space-y-7 h-[70vh]">
                        <div>
                            <h1 className='pb-3 text-gray-300 border-b'>
                                Category
                            </h1>
                            <div className='pt-5'>
                                <RadioGroup
                                 defaultValue="all" 
                                 onValueChange={(value) => handleFilterChange("category", value)}>
                                    <div className='flex items-center gap-2'>
                                       <RadioGroupItem value='all' id="r1"/>
                                       <Label htmlFor="r1">all</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                       <RadioGroupItem value='fullstack' id="r2"/>
                                       <Label htmlFor="r2">fullstack</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                       <RadioGroupItem value='frontend' id="r3"/>
                                       <Label htmlFor="r3">frontend</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                       <RadioGroupItem value='backend' id="r4"/>
                                       <Label htmlFor="r4">backend</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                    </ScrollArea>

                </CardContent>

            </Card>

        </section>

        <section className='projectListSection w-full lg:w-[48rem]'>

        </section>

    </div>
    </>
  )
}

export default ProjectList
