<?php

namespace Gogoprint\AddToCart\Block\Product;

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Catalog\Model\Category;


class View extends \Magento\Catalog\Block\Product\View
{
 
    /**
     * Customer session factory
     * 
     * @var \Magento\Customer\Model\SessionFactory
     */
    protected $customerSessionFactory;

    /**
     * Customer factory
     * 
     * @var \Magento\Customer\Model\CustomerFactory
     */
    protected $customer;

    protected $websiteId;

    protected $_productAttributeRepository;

    protected $date;
    /**
     * @param Context $context
     * @param \Magento\Framework\Url\EncoderInterface $urlEncoder
     * @param \Magento\Framework\Json\EncoderInterface $jsonEncoder
     * @param \Magento\Framework\Stdlib\StringUtils $string
     * @param \Magento\Catalog\Helper\Product $productHelper
     * @param \Magento\Catalog\Model\ProductTypes\ConfigInterface $productTypeConfig
     * @param \Magento\Framework\Locale\FormatInterface $localeFormat
     * @param \Magento\Customer\Model\Session $customerSession
     * @param ProductRepositoryInterface|\Magento\Framework\Pricing\PriceCurrencyInterface $productRepository
     * @param \Magento\Framework\Pricing\PriceCurrencyInterface $priceCurrency
     * @param array $data
     * @codingStandardsIgnoreStart
     * @SuppressWarnings(PHPMD.ExcessiveParameterList)
     */
    public function __construct(
        \Magento\Catalog\Block\Product\Context $context,
        \Magento\Framework\Url\EncoderInterface $urlEncoder,
        \Magento\Framework\Json\EncoderInterface $jsonEncoder,
        \Magento\Framework\Stdlib\StringUtils $string,
        \Magento\Catalog\Helper\Product $productHelper,
        \Magento\Catalog\Model\ProductTypes\ConfigInterface $productTypeConfig,
        \Magento\Framework\Locale\FormatInterface $localeFormat,
        \Magento\Customer\Model\Session $customerSession,
        ProductRepositoryInterface $productRepository,
        \Magento\Framework\Pricing\PriceCurrencyInterface $priceCurrency,
        \Magento\Customer\Model\SessionFactory $customerSessionFactory,
        \Magento\Customer\Model\CustomerFactory $customer,
        \Magento\Catalog\Model\Product\Attribute\Repository $productAttributeRepository,
        \Magento\Framework\Stdlib\DateTime\DateTime $date,
        \Magento\Catalog\Model\Product\TierPriceManagement $tierPriceManagement,
        array $data = []
    ) {
        
        $this->customerSessionFactory = $customerSessionFactory->create();
        $this->customer = $customer->create();
        $this->websiteId = $context->getStoreManager()->getStore()->getWebsiteId();
        $this->_productAttributeRepository = $productAttributeRepository;
        $this->priceCurrency = $priceCurrency;
        $this->tierPriceManagement = $tierPriceManagement;
        $this->date = $date;
        parent::__construct(
            $context,
            $urlEncoder,
            $jsonEncoder,
            $string,
            $productHelper,
            $productTypeConfig,
            $localeFormat,
            $customerSession,
            $productRepository,
            $priceCurrency,
            $data
        );
    }

    
    /**
     * Return the customer id
     * 
     * @return int
     */
    public function getCurrentCustomerId()
    {
        if ($this->customerSessionFactory->isLoggedIn()) {
            return $this->customerSessionFactory->getData('customer_id');
        } else {
            return 0;
        }
    }

    /**
     * Return the qty increments option from product attributes "qty_increments"
     * 
     * @return int
     */
    public function getQtyIncrements(){
        $qtyIncrements = $this->_productAttributeRepository->get('qty_increments')->getOptions();       
        $values = array();
        $qtyOption = array_shift($values);
        foreach ($qtyIncrements as $qtyIncrement) { 
            $qtyOption[] = $qtyIncrement->getLabel();  // Label
        }
        return $qtyOption;
    }  


     /**
     * Return the delivery time
     * 
     * @return int
     */
     public function getDeliveryTime(){
        $date = $this->date->gmtDate('Y-m-d');
        // $dateAdd = str_replace('-', '/', $date);
        $productionDay = $this->_productAttributeRepository->get('production_day')->getOptions();       
        $days = array();
        foreach ($productionDay as $prodDday) { 
            $days[] = array(
               'day' => $prodDday['label'],
               'endDate' => date('d M Y',strtotime(str_replace('-', '/', $date) . "+".$prodDday['label']." days"))
            );
            
        }

        return $days;
    }  

     /**
     * Get Date Row
     * 
     * @return int
     */
    public function getRowDate(){
        $getDate = $this->getDeliveryTime();
        $dateData = array_shift($getDate);
            foreach($getDate as $date){
                echo '<th>'. $date['endDate'] .'</th>';
            }
    }

    /**
     * Get product price (assumption same price for all simple product)
     * 
     * @return int
     */
    public function getProdukPrice(){
       $product = $this->getProduct();
       $productTypeInstance = $product->getTypeInstance();
       $usedProducts = $productTypeInstance->getUsedProducts($product);
       $children = array();
       foreach ($usedProducts  as $child) { 
            
            
            $children[] = array(
                'id' => $child->getId(),
                'sku' => $child->getSku(),
                'tier' => $child->getTierPrice()
            );
       }
       return $children;
    }



    /**
     * Get Qty Row
     * 
     * @return int
     */
    public function getColQty(){
        $getOptionValue = $this->getQtyIncrements();
        $optionQty = array_shift($getOptionValue);
        $price = $this->getProdukPrice();

        // Temporary Show Price
        $product = $this->getProduct();
        $productPrice = $product->getPriceInfo()->getPrice('regular_price')->getAmount()->getValue();
        $formatedPrice = $this->priceCurrency->format($productPrice,true,0);
        // foreach($price as $priceTier){
        //     echo $priceTier['id'];
        // }
            foreach($getOptionValue as $quantity){
                echo '<tr>';
                echo '<td>'. $quantity.'</td>';
                echo '<td><label class="radio"><input type="radio" name="qty" value="'.$productPrice.'">'.$formatedPrice.'</label></td>';
                echo '<td><label class="radio"><input type="radio" name="qty" value="'.$productPrice.'">'.$formatedPrice.'</label></td>';
                echo '<td><label class="radio"><input type="radio" name="qty" value="'.$productPrice.'">'.$formatedPrice.'</label></td>';
                echo '<td><label class="radio"><input type="radio" name="qty" value="'.$productPrice.'">'.$formatedPrice.'</label></td>';
                echo '</tr>';
            }
    }




}