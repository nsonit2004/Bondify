package com.example.demo.controller;

import com.example.demo.model.Province;
import com.example.demo.model.District;
import com.example.demo.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/provinces")
    public List<Province> getProvinces() {
        return locationService.getAllProvinces();
    }

    @GetMapping("/districts/{provinceId}")
    public List<District> getDistricts(@PathVariable Long provinceId) {
        return locationService.getDistrictsByProvinceId(provinceId);
    }
}
