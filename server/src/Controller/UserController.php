<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\PistaRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/User')]
class UserController extends AbstractController
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    #[Route('/User', name: 'app_user_index', methods: ['GET'])]
    public function list(Request $request): Response
    {
        $this->logger->info('We are logging!');
        $title = $request->get('title', "No title");
        $response = new JsonResponse();
        $response->setData(['data' => 'Hello World', 'status' => 200, 'libro' => $title]);
        return $response;
    }

    #[Route('/create', name: 'app_user_create', methods: ['GET'])]
    public function createUser(Request $request, EntityManagerInterface $em){
        $name = $request->get('name', null);
        $email = $request->get('email', null);
        $user = new User();
        $user->setName($name);
        $user->setEmail($email);
        if($name != null){
            $em->persist($user);
            $em->flush();
            $response = new JsonResponse();
            $response->setData([
                'data' => [
                    [
                        'name' => $user->getName(),
                        'email' => $user->getEmail()
                    ]
                ],
            ]);
            
        }else{
            $response = new JsonResponse();
            $response->setData([
                'data' => 'Error al crear el usuario',
            ]);
        }
        return $response;

    }

    #[Route('/show', name: 'app_user_show', methods: ['GET'])]
    public function showUser(Request $request, EntityManagerInterface $em){
        $id = $request->get('id', null);
        $user = $em->getRepository(User::class)->find($id);
        if($user != null){
            $response = new JsonResponse();
            $response->setData([
                'data' => [
                    [
                        'name' => $user->getName(),
                        'email' => $user->getEmail()
                    ]
                ],
            ]);
        }else{
            $response = new JsonResponse();
            $response->setData([
                'data' => 'Error al mostrar el usuario',
            ]);
        }
        return $response;
    }
}