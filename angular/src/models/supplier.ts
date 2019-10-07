export class Supplier {
  private supplierId: number;
  private supplierName: string;


	constructor(supplierId: number, supplierName: string) {
		this.supplierId = supplierId;
		this.supplierName = supplierName;
	}


    /**
     * Getter $supplierId
     * @return {number}
     */
	public get $supplierId(): number {
		return this.supplierId;
	}

    /**
     * Getter $supplierName
     * @return {string}
     */
	public get $supplierName(): string {
		return this.supplierName;
	}

    /**
     * Setter $supplierId
     * @param {number} value
     */
	public set $supplierId(value: number) {
		this.supplierId = value;
	}

    /**
     * Setter $supplierName
     * @param {string} value
     */
	public set $supplierName(value: string) {
		this.supplierName = value;
	}

}