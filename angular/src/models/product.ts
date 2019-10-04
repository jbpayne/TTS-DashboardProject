import { Category } from './category';
import { Supplier } from './supplier';
import { Observable } from 'rxjs';

export class Product {
  private id: number;
  private productName: string;
  private category: {};
  private fullPrice: number;
  private salePrice: number;
  private discount: number;
  private availability: boolean;
  private supplier: {};

  constructor(id: number, 
     productName: string, 
     category: {}, 
     fullPrice: number, 
     salePrice: number, 
     discount: number, 
     availability: boolean, 
     supplier: {}) {
    this.id = id;
    this.productName = productName;
    this.category = category;
    this.fullPrice = fullPrice;
    this.salePrice = salePrice;
    this.discount = discount;
    this.availability = availability;
    this.supplier = supplier;
  }


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $productName
     * @return {string}
     */
	public get $productName(): string {
		return this.productName;
	}

    /**
     * Getter $category
     * @return {Category}
     */
	public get $category(): {} {
		return this.category;
	}

    /**
     * Getter $fullPrice
     * @return {number}
     */
	public get $fullPrice(): number {
		return this.fullPrice;
	}

    /**
     * Getter $salePrice
     * @return {number}
     */
    public get $salePrice(): number {
     return this.salePrice;
}

    /**
     * Getter $discount
     * @return {number}
     */
    public get $discount(): number {
     return this.discount;
}

    /**
     * Getter $availability
     * @return {boolean}
     */
	public get $availability(): boolean {
		return this.availability;
	}

    /**
     * Getter $supplier
     * @return {Supplier}
     */
	public get $supplier(): {} {
		return this.supplier;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $productName
     * @param {string} value
     */
	public set $productName(value: string) {
		this.productName = value;
	}

    /**
     * Setter $category
     * @param {Category} value
     */
	public set $category(value: {}) {
		this.category = value;
	}

    /**
     * Setter $fullPrice
     * @param {number} value
     */
	public set $fullPrice(value: number) {
		this.fullPrice = value;
	}

    /**
     * Setter $salePrice
     * @param {number} value
     */
    public set $salePrice(value: number) {
     this.salePrice = value;
}

    /**
     * Setter $discount
     * @param {number} value
     */
    public set $discount(value: number) {
     this.discount = value;
}

    /**
     * Setter $availability
     * @param {boolean} value
     */
	public set $availability(value: boolean) {
		this.availability = value;
	}

    /**
     * Setter $supplier
     * @param {Supplier} value
     */
	public set $supplier(value: {}) {
		this.supplier = value;
	}

}
