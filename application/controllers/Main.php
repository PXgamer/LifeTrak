<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use GuzzleHttp\Client as Guzzle;
use GuzzleHttp\Exception\RequestException;

class Main extends CI_Controller
{
    public function index()
    {
        $view = $this->load->view('index', [], true);
        $this->load->view('include/template', ['view' => $view]);
    }

    public function authenticate()
    {
        $authCode =
        $errorCode = null;

        if ($this->input->get('code')) {
            $gTrakt = new Guzzle(['base_uri' => 'https://api.trakt.tv']);
            $errorCode = 'Invalid data returned.';

            $code = $this->input->get('code');
            $client_id = $this->config->item('trakt_client_id');
            $client_secret = $this->config->item('trakt_client_secret');

            try {

                $response = $gTrakt->request(
                    'POST',
                    'oauth/token',
                    [
                        'form_params' => [
                            'code' => $code,
                            'client_id' => $client_id,
                            'client_secret' => $client_secret,
                            'redirect_uri' => base_url('authentication'),
                            'grant_type' => 'authorization_code'
                        ],
                        'verify' => false
                    ]
                );

                $data = json_decode($response->getBody());

                if (isset($data->access_token)) {
                    $authCode = trim($data->access_token);
                    $errorCode = null;
                } else {
                    $errorCode = 'Invalid data returned.';
                }
            } catch (RequestException $e) {
                $errorCode = 'Failed to authenticate, invalid `code`.';
            }
        }

        $view = $this->load->view('pages/authenticate', ['_authCode' => $authCode, '_errorCode' => $errorCode], true);
        $this->load->view('include/template', ['view' => $view]);
    }
}
