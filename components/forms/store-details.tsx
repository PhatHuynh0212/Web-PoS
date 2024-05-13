"use client";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { NumberInput } from "@tremor/react";

import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";

import * as z from "zod";

import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { Store } from "@prisma/client";
import { ImageUpload } from "../uploaders/image-upload";
import Loading from "../loaders/loading";

import { StoreDetailsSchema } from "@/schema";

import { deleteStore, upsertStore } from "@/lib/queries";

type Props = {
    data?: Store;
};

const StoreDetails = ({ data }: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const [deletingStore, setDeletingStore] = useState(false);

    const form = useForm<z.infer<typeof StoreDetailsSchema>>({
        mode: "onChange",
        resolver: zodResolver(StoreDetailsSchema),
        defaultValues: {
            name: data?.name || "",
            storeEmail: data?.storeEmail || "",
            storePhone: data?.storePhone || "",
            address: data?.address || "",
            city: data?.city || "",
            zipCode: data?.zipCode || "",
            state: data?.state || "",
            country: data?.country || "",
            storeLogo: data?.storeLogo || null,
        },
    });
    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof StoreDetailsSchema>) => {
        try {
            await upsertStore(values, data?.id).then((res) => {
                if (res && !data?.id) {
                    toast({
                        title: "Store created",
                    });
                    router.push(`/dashboard`);
                } else if (res && data?.id) {
                    toast({
                        title: "Store updated",
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Something went wrong!!!",
                    });
                }
            });
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oh no!",
                description: "Something went wrong",
            });
        }
    };
    const handleDeleteStore = async () => {
        if (!data?.id) return;
        setDeletingStore(true);
        try {
            const response = await deleteStore();
            toast({
                title: "Deleted store",
                description: "Deleted your store and all data",
            });
            router.refresh();
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oops!",
                description: "could not delete your store",
            });
        }
        router.push("/setup");
        setDeletingStore(false);
    };

    return (
        <AlertDialog>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="storeLogo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Logo</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                endpoint="imageUploader"
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your store name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="storeEmail"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="storePhone"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123 st..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="City"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="State"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Zipcode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Zipcode"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Country"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between items-center">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loading />
                                    ) : (
                                        "Save store Information"
                                    )}
                                </Button>
                                {data?.id && (
                                    <div className="flex flex-row items-center justify-center rounded-lg border border-destructive pb-1 pl-3 pr-3">
                                        <AlertDialogTrigger
                                            disabled={
                                                isLoading || deletingStore
                                            }
                                            className="text-red-600 text-center mt-2 rounded-md hove:bg-red-600 whitespace-nowrap"
                                        >
                                            {deletingStore
                                                ? "Deleting..."
                                                : "Delete Store"}
                                        </AlertDialogTrigger>
                                    </div>
                                )}
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-left">
                                            Surely, you want to delete?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-left">
                                            Data cannot be recovered
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex items-center">
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            disabled={deletingStore}
                                            className="bg-destructive hover:bg-destructive"
                                            onClick={handleDeleteStore}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AlertDialog>
    );
};

export default StoreDetails;
