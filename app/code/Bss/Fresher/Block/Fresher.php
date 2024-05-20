<?php
declare(strict_types=1);

namespace Bss\Fresher\Block;

use Magento\Framework\View\Element\Template;

/**
 * Class Index
 * Returns text
 */
class Fresher extends Template
{
    /**
     * Constructor for Requirejs class.
     *
     * @return string
     */
    public function getHelloworldData()
    {
        return 'BSS Helloworld block file call successfully';
    }
}
