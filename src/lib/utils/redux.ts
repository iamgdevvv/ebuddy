const rtkQueryLoading = (result: { isLoading?: boolean; isFetching?: boolean }): boolean => {
	return Boolean(result?.isLoading) || Boolean(result?.isFetching);
};

export { rtkQueryLoading };
