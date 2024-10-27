package com.example.demo.service;

import com.example.demo.model.Province;
import com.example.demo.model.District;
import com.example.demo.repository.ProvinceRepository;
import com.example.demo.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private DistrictRepository districtRepository;

    public List<Province> getAllProvinces() {
        return provinceRepository.findAll();
    }

    public List<District> getDistrictsByProvinceId(Long provinceId) {
        List<District> districts = districtRepository.findByProvinceId(provinceId);
        System.out.println("Districts found: " + districts.size());
        return districts;
    }

}
