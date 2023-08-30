"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";




interface BillboardFormProps {
initialData: Billboard | null;

}

// zod schema (data validation schema)
// specifies that name should be a string with minimum of 1 char
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});


// so we don't have to write this everytime
// type definition derived from formSchema
// represents expected shape of the form values based on validation schema
type BillboardFormValues = z.infer<typeof formSchema>;


export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard"
    const description = initialData ? "Edit billboard" : "Add a billboard"
    const toastMesssage = initialData ? "Billboard updated" : "Billboard created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
        }

    });

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            // this will get the PATCH function from api - stores - storeId
            // updated to post
            // if data exists we'll patch
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }

            router.refresh(); // resynchronizes server component calling `store` again to get new data which we just updated
            router.push(`/${params.storeId}/billboards`) // return to billboard page on submit
            toast.success("Billboard created.");
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Store deleted.")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard products first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
        <AlertModal
         isOpen={open}
         onClose={() => setOpen(false)}
         onConfirm={onDelete}
         loading={loading}
         />
        <div className="flex items-center justify-between">
            <Heading
                title={title}
                description="description"
             />

             {/* hides delete button until we successfully create a billboard */}
             {initialData && (

                <Button
                 disabled={loading}
                 variant="destructive"
                 size="sm"
                 onClick={() => setOpen(true)}
                 >
                    <Trash className="h-4 w-4"/>
                 </Button>
                )
             }
        </div>
        <Separator />
        {/* spread out 'form' defined earlier */}
        <Form {...form}>
            {/* onSubmit is custom from the defined at top of file */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Background image</FormLabel>
                    <FormControl>
                        <ImageUpload
                            // image upload expects an array so we mock it with field.value
                            // otherwise if billboard has no image pass in empty array
                            value={field.value ? [field.value] : []}
                            disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove = {()=> field.onChange("")}
                        />
                    </FormControl>
                    <FormMessage />
            </FormItem>
                     )}/>
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                     control={form.control}
                     name="label"
                     render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Billboard label" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )}/>

                </div>
                <Button
                    disabled={loading}
                    className="ml-auto"
                    type="submit">
                    {action}
                </Button>
            </form>
        </Form>


        </>

    );
};
