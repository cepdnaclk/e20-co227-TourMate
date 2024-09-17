package com.mapa.restapi.service;

import com.mapa.restapi.dto.DestinationDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class DestinationServiceTest {

    @Autowired
    private DestinationService destinationService;

    @Test
    public  void getPlaces(){
        List<DestinationDTO> places = destinationService.getAllDestinations();
        System.out.println(places);
    }

}