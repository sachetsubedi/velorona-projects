"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteTransaction, getAllTransactions } from "@/lib/api/transaction";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const AllTransactions = () => {
	const router = useRouter();
	const { data, isLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: getAllTransactions,
	});
	const mutation = useMutation({
		mutationKey: ["delete"],
		mutationFn: deleteTransaction,
		onSuccess: () => {
			router.push("/");
		},
	});

	useEffect(() => {}, [data]);
	return (
		<div className="flex flex-col justify-center items-center h-screen  ">
			<Card className="p-5 w-[30%]">
				<CardTitle>Money App </CardTitle>
				<div className="flex justify-between">
					<CardHeader className="pl-0">Track your money</CardHeader>
					<Link href="/transactions/create">
						<Button className="self-center">Add</Button>
					</Link>
				</div>
				{isLoading ? (
					<div className="flex gap-3 flex-col">
						<Skeleton className="h-28 w-full" />
						<Skeleton className="h-28 w-full" />
					</div>
				) : (
					""
				)}
				{data?.map((item: any, index: any) => {
					return (
						<Card key={index} className="w-full flex justify-between mb-3">
							<div>
								<CardTitle>{item.title}</CardTitle>
								<CardContent>{item.amount} $ </CardContent>
							</div>
							<div className="flex flex-col gap-2">
								<Link href={`/transactions/${item.id}/edit`} className="w-full">
									<Button variant={"secondary"} className="w-full">
										Edit
									</Button>
								</Link>
								<Button
									variant={"destructive"}
									onClick={() => {
										mutation.mutate(item.id);
									}}
								>
									Delete
								</Button>
							</div>
						</Card>
					);
				})}
			</Card>
		</div>
	);
};
export default AllTransactions;
