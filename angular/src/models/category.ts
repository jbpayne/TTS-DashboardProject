export class Category {
  private categoryId: number;
  private categoryName: string;

	constructor(categoryId: number, categoryName: string) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

    /**
     * Getter $categoryId
     * @return {number}
     */
	public get $categoryId(): number {
		return this.categoryId;
	}

    /**
     * Getter $categoryName
     * @return {string}
     */
	public get $categoryName(): string {
		return this.categoryName;
	}

    /**
     * Setter $categoryId
     * @param {number} value
     */
	public set $categoryId(value: number) {
		this.categoryId = value;
	}

    /**
     * Setter $categoryName
     * @param {string} value
     */
	public set $categoryName(value: string) {
		this.categoryName = value;
	}

}