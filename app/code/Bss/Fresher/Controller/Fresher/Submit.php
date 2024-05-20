<?php
declare(strict_types=1);

namespace Bss\Fresher\Controller\Fresher;

use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\JsonFactory;

/**
 * Class Submit
 * Response for submit
 */
class Submit implements HttpPostActionInterface
{
    /**
     * @var JsonFactory
     */
    protected $resultJsonFactory;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @param JsonFactory $resultJsonFactory
     * @param RequestInterface $request
     */
    public function __construct(
        JsonFactory $resultJsonFactory,
        RequestInterface $request
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->request = $request;
    }

    /**
     * Returns data json representation
     *
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\Result\Json|\Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $data = $this->request->getPostValue();

        if ($data && isset($data['name']) && isset($data['telephone']) && isset($data['dob'])) {
            $result = [
                'success' => true,
                'data' => [
                    'name' => $data['name'],
                    'telephone' => $data['telephone'],
                    'dob' => $data['dob'],
                    'message' => isset($data['message']) ? $data['message'] : ''
                ]
            ];
        } else {
            $result = [
                'success' => false,
                'message' => 'Missing required fields'
            ];
        }

        return $this->resultJsonFactory->create()->setData($result);
    }
}
