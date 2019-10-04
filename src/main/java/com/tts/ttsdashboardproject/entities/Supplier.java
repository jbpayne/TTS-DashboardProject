package com.tts.ttsdashboardproject.entities;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplierid")
    private int supplierId;

    @Column(name = "suppliername")
    private String supplierName;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Product> products;

    public Supplier() {

    }

    public Supplier(String supplierName) {
        this.supplierName = supplierName;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Supplier supplier = (Supplier) o;
        return supplierId == supplier.supplierId &&
                Objects.equals(supplierName, supplier.supplierName) &&
                Objects.equals(products, supplier.products);
    }

    @Override
    public int hashCode() {
        return Objects.hash(supplierId, supplierName, products);
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "supplierId=" + supplierId +
                ", supplierName='" + supplierName + '\'' +
                ", products=" + products +
                '}';
    }
}

