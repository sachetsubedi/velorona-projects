import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schema";
import { useRouter } from "next/router";
import { addTransaction } from "@/lib/api/transaction";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function AddTransaction() {
	// const queriedData = useQuery({
	// 	queryKey: ["transactions"],
	// 	queryFn: () => addTransaction(data),
	// });

	const router = useRouter();
	const transactionForm = useForm<Transaction>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			title: "",
			amount: 0,
		},
	});

	transactionForm.reset();
	const submitForm = (data: any) => {};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-[30%]">
				<CardTitle>Add transaction</CardTitle>

				<form
					onSubmit={transactionForm.handleSubmit(submitForm)}
					className="flex flex-col gap-2"
				>
					<Input
						placeholder="Title"
						type="text"
						className={cn("",transactionForm.formState.errors.title ? "border-destructive" : "")}
						defaultValue={""}
						{...transactionForm.register("title")}
					></Input>

					<Input
						placeholder="Amount"
						type="number"
						defaultValue={""}
						{...transactionForm.register("amount")}
					></Input>

					<Button type="submit">Submit</Button>
				</form>
			</Card>
		</div>
	);
}
