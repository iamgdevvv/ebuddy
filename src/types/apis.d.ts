type Res = {
    success: boolean;
	statusCode: number;
	message: string;
};

type ResResult<T> = Res & {
	data: T;
};
