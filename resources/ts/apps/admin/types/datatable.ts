interface Datatable {
    current_page?: number;
    per_page?: number;
    last_page?: number;
    first_page?: number;
    data?: object[]
}

export default Datatable;
